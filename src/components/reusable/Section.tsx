type SectionProps = {
  icon: React.ReactElement;
  title: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const Section: React.FC<SectionProps> = ({ icon, title, children, ...restProps }) => {
  return (
    <div {...restProps} className={'space-y-8' + ` ${restProps?.className}`}>
      <div className="flex space-x-4 items-center">
        {icon ? icon : null}
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>
      {children}
    </div>
  );
};
