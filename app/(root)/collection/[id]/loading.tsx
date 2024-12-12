import { LoaderPinwheel } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex size-full items-center justify-center">
      <LoaderPinwheel className="animate-spin" />
    </div>
  );
};

export default Loading;
