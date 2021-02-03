import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

export default function ProgressView() {
  return (
    <div>
      <Skeleton variant="text" width={250} height={40} />
      <Skeleton variant="text" height={40} />
      <Skeleton variant="rect" height={450} />
    </div>
  );
}