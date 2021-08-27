import groq from 'groq';
import { parseISO, format } from 'date-fns';
import { sanity } from '$lib/sanity';

const query = groq`
  *[_type == "post" && slug.current == $slug][0] {
    title,
    publishedAt,
    description,
    body[] {
      ...,
      _type == 'figure' => {
        ...,
        image { asset-> }
      }
    }
  }
`;

export type QueryResult = Pick<Sanity.Schema.Post, "title" | "publishedAt" | "description" | "body">;

export const get = async ({ params }) => {
  const { slug } = params;

  const result = await sanity.fetch<QueryResult>(query, { slug });

  if (result) {
    return {
      body: {
        ...result,
        publishedAt: format(parseISO(result.publishedAt), "EEE do MMMM ''yy")
      },
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    }
  }

  return {
    status: 404,
    error: new Error(`Could not find post /${slug} from Sanity.io`)
  };
};
