function SkeletonCard({}) {
  return (
    <>
      <div className=" bg-white dark:bg-darkpalleteDark rounded-3xl w-full h-fit p-3 m-auto animate-pulse">
        <div className="bg-neutral-300 dark:bg-neutral-700 w-full h-full aspect-square rounded-2xl animate-pulse"></div>
        <div className="flex justify-between items-center">
          <div className="overflow-hidden w-full">
            <div className="h-7 w-1/2 bg-neutral-300 dark:bg-neutral-700 rounded-full my-3"></div>
            <div className=" h-5 w-3/4 bg-neutral-300 dark:bg-neutral-700 rounded-full"></div>
          </div>
        </div>
        <div className="flex justify-between items-center pt-3 w-full">
          <div className="size-15 rounded-3xl bg-neutral-300 dark:bg-neutral-700"></div>
          <div className="flex flex-col justify-end items-end gap-2 w-1/2">
            <div className="h-5 w-2/3 bg-neutral-300 dark:bg-neutral-700 rounded-3xl"></div>
            <div className="h-7 w-full bg-neutral-300 dark:bg-neutral-700 rounded-full"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SkeletonCard;
