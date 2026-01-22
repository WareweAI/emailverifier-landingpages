import Image from "next/image";

export default function HappyUsers() {
  return (
    <div className="flex items-center justify-center lg:justify-start gap-2">
      {/* Avatars */}
      <div className="flex -space-x-3">
        <div className="relative h-8 w-8 rounded-full border border-white overflow-hidden">
          <Image
            src="/users/1.png"
            alt="User 1"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative h-8 w-8 rounded-full border border-white overflow-hidden">
          <Image
            src="/users/1.png"
            alt="User 2"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative h-8 w-8 rounded-full border border-white overflow-hidden">
          <Image
            src="/users/3.png"
            alt="User 3"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Text */}
      <span className="text-sm font-semibold text-gray-500">
        <span className=" text-gray-600">1000+</span> Happy Users
      </span>
    </div>
  );
}
