import { memo } from 'react';

type BadgeProps = {} & React.HTMLAttributes<HTMLSpanElement>;

export const Badge = memo<BadgeProps>(function Badge({ children, ...restProps }) {
  return (
    <span
      {...restProps}
      className={
        'inline-flex items-center px-2.5 py-0.5 rounded-md bg-gray-200 text-gray-800 ' +
        restProps.className
      }>
      {children}
    </span>
  );
});
