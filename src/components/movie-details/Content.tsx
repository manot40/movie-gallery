import React, { memo } from 'react';

import { Container } from 'components/reusable';
import { Cast, Recommendation, Trailer } from './contents';

type ContentProps = {
  data?: MovieDetail;
} & React.ComponentProps<typeof Container>;

const Content: React.FC<ContentProps> = ({ data, children, ...restProps }) => {
  return (
    <Container {...restProps} className={'font-body ' + restProps.className}>
      <Cast id={data?.id} />

      <Trailer data={data?.trailer_video} />

      <Recommendation id={data?.id} />

      <div className="h-20 w-full" />
    </Container>
  );
};

export default memo(Content);
