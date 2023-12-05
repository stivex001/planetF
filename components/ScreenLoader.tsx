import { Spinner } from "@/components/Spinner";

export const ScreenLoader = () => {
  return (
    <div className="text-theme-green w-full h-full flex items-center justify-center">
      <Spinner />
    </div>
  );
};
