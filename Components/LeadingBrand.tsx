import Image from "next/image";


const BRANDS = [
    {
        src: "/logos/wareweeLogo.webp",
        alt: "Warewee",
    },
    {
        src: "/logos/redserpLogo.webp",
        alt: "RedSerp",
    },
    {
        src: "/logos/paperboatLogo.webp",
        alt: "Paperbot AI",
    },
    {
        src: "/logos/saasyogiLogo.webp",
        alt: "SaaS Yogi",
    },
];

export default function LeadingBrand() {
    return (
        <div className="my-10 px-2 border-t border-transparent">
            <p className="text-xl lg:text-2xl text-center font-semibold">
                Leading Brands and Agencies Using Emailverifier.io
            </p>

            <div className="mt-6 flex justify-center items-center gap-10 flex-wrap" aria-hidden={false}>
                {BRANDS.map((brand) => (
                    <Image
                        key={brand.src}
                        src={brand.src}
                        alt={brand.alt}
                        width={144}
                        height={48}
                        className="w-36 h-auto object-contain"
                        loading="lazy"
                    />
                ))}
            </div>
        </div>
    )
}
