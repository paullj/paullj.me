// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

import post from './documents/post';
import person from './documents/person';
import category from './documents/category';
import project from './documents/project';
import settings from './documents/settings'

import blockContent from './array/blockContent';

import figure from './objects/figure';


// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    post,
    person,
    project,
    settings,
    category,
    blockContent,
    figure,
  ]),
})
