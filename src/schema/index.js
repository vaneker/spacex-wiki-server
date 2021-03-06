/**
 * Schemas are blueprints for all the data that can be accessed in the graph.
 */

import { gql } from 'apollo-server-express';

import sxInfo from './spacex-api/spacex';
import launch from './spacex-api/launch';
import capsule from './spacex-api/capsule';
import core from './spacex-api/core';
import mission from './spacex-api/mission';
import launchpad from './spacex-api/launchpad';

import forecast from './weather-api/forecast';

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }

  type Forecast {
    _: Boolean
  }
`;

export default [
  linkSchema,
  sxInfo,
  launch,
  capsule,
  core,
  mission,
  launchpad,
  forecast
];
