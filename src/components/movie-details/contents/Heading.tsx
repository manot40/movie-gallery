type HeadingProps = {
  title: string;
  noHr?: boolean;
};

const Heading: React.FC<HeadingProps> = ({ title, noHr }) => {
  return (
    <div className="">
      <h1 className="text-2xl font-bold">{title}</h1>
      {noHr ? null : <hr className="mt-2 mb-4" />}
    </div>
  );
};

export default Heading;
