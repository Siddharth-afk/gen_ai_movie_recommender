import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

const temp = [1, 2, 3, 4];

const Response = () => {
  return (
    <div className="w-full flex h-full bg-blue-300 rounded-md shadow-2xl items-center justify-center">
      <Carousel className="w-[90%] h-full bg-black">
        <CarouselContent className="h-full w-full flex">
          {temp.map((i, index) => {
            return (
              <CarouselItem key={index} className="bg-white">
                <div className="p-1 w-full flex">{i}</div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Response;
