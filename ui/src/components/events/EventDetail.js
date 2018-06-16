import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Imgix from 'react-imgix';
import Involvement from './Involved.js';
import Loading from '../Loading';

const EventDetail = (props) => {
  const slug = props.match.params.slug;

  return <Query
    query={gql`
      query event($slug: String!){
        event(slug: $slug) {
          title
          organizer_desc
          opus_desc
          image_url
          opus_id
          involvement{
            user{
              username
            }
            role
          }
        }
      }
    `}
    variables={{slug}}
  >
    {({ loading, error, data }) => {
      if (loading) return <Loading />;
      if (error) return <p>Error</p>;
      if (!data.event) return <p>No event found</p>;
      const e = data.event;

      return (
        <div>
          <Imgix
            src={e.image_url}
            width={800}
            height={450}
            crop={'faces'}
            fit={'crop'}
            customParams={{ blend: "222d3d", balph: 60, bm: 'normal' }}
          />
          <h1>{e.title}</h1>
          <h3>{e.opus_desc}</h3>
          <p>{e.organizer_desc}</p>
          {e.involvement && <ul>
            {e.involvement.map( (i) => <Involvement inv={i} key={i.user.username}/> )}
          </ul>}
        </div>
      );
    }}
  </Query>
};

export default EventDetail;