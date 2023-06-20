interface Title {
  children: React.ReactNode;
}

const Title = ({ children }: Title) => {
  return <h1 className="text-2xl font-bold">{children}</h1>;
};

export default Title;
