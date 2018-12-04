import { paginateResults } from '../../utils';

export default {
  Query: {
    allLaunches: async (_, { pageSize = 20, after }, { dataSources }) => {
      const allLaunches = await dataSources.sxLaunch.getAllLaunches();
      // put launches in reverse chronological order
      allLaunches.reverse();

      const launches = paginateResults({
        after,
        pageSize,
        results: allLaunches
      });

      return {
        launches,
        cursor: launches.length ? launches[launches.length - 1].cursor : null,
        // if the cursor of the end of the paginated results is the same as the
        // last item in _all_ results, then there are no more results after this
        hasMore: launches.length
          ? launches[launches.length - 1].cursor !==
            allLaunches[allLaunches.length - 1].cursor
          : false
      };
    },
    singleLaunch: (_, { id }, { dataSources }) =>
      dataSources.sxLaunch.getLaunchById({ launchId: id })
  },
  LaunchLinks: {
    // make sure the default size is 'large' in case user doesn't specify
    missionPatch: (links, { size } = { size: 'LARGE' }) => {
      return size === 'SMALL'
        ? links.missionPatchSmall
        : links.missionPatchLarge;
    }
  }
};
