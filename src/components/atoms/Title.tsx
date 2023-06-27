interface Title {
  children: React.ReactNode;
}

const Title = ({ children }: Title) => {
  return <h1 className="text-3xl font-bold p-2 mb-2 text-white">{children}</h1>;
};

export default Title;
