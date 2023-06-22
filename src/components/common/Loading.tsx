const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex space-x-2">
        <div className="w-3 h-3 rounded-full bg-gray-500 animate-bounce" />
        <div className="w-3 h-3 rounded-full bg-gray-500 animate-bounce" />
        <div className="w-3 h-3 rounded-full bg-gray-500 animate-bounce" />
      </div>
    </div>
  );
};

export default Loading;
