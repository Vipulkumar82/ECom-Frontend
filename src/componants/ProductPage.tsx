import type { SingleProduct } from "../types/product";
import ProductCard from "./ProductCard";

export const products: SingleProduct[] = [
  {
    id: 1,
    imageUrl:
      "https://rukminim2.flixcart.com/image/312/312/xif0q/computer/f/w/u/-original-imahbwnhkgr5p46r.jpeg?q=70",
    title: "Laptop",
    description:
      "This is a HP Victus Gaming Laptop i5 12th gen 8GB RAM 512Gb ROM",
    category: "Electronics",
    price: 70000,
    discountPercentage: 10,
    rating: 4.5,
    stock: 10,
    tags: ["laptop", "gaming", "HP"],
    brand: "HP",
    sku: "HPVIC123",
    weight: 2.2,
    dimensions: { width: 35, height: 2, depth: 25 },
    warrantyInformation: "1 year manufacturer warranty",
    shippingInformation: "Ships in 2-3 days",
    availabilityStatus: "In Stock",
    reviews: [],
    returnPolicy: "30 days return",
    minimumOrderQuantity: 1,
    meta: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      barcode: "1234567890",
      qrCode: "https://example.com/qr",
    },
    thumbnail: "#",
  },
  {
    id: 1,
    imageUrl:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUQEBAWFRAWGBcSFxgYGRYaGBgXFxUWGBYWFxgYHiggGRolGxgWITEiJyktLi4uFyAzODMsNygtLisBCgoKDg0OGxAQGy4lHyYvLTItNzctKy8tNS8vLTUtLS0vMC8tKy8tLy8vLS8tLS0tLy0vKy0tLS0tLy0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAgIDAQAAAAAAAAAAAAAABgcFCAECBAP/xABKEAABAwICBgUFDwIEBQUAAAABAAIDBBESIQUGMUFRYRMicYGRBxcyobEUIzRCUlRVc4KSk7LB0dJichVT4fAWM5TC8SRDY4Oi/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAIDBAEFBv/EADARAAICAQMBBQcDBQAAAAAAAAABAgMRBBIhMRNBUWGBFCIycbHR8JGh8QUVI8Hh/9oADAMBAAIRAxEAPwC8UREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBEVaaz+WajpKh9MyGSd8ZLXuZhDA4ZOaCTckHI5WQFloqd8/tN8xm++xPP7TfMZvvsQFxIqgPl4gw4/8OnwHIOxNse+1l0Pl9pxtoJh9tiAuJFTnn+pvmM332LsfL1BYH/D57G9jiZY222O9AXCipzz/AFN8xm++xPP9TfMZvvsQFxoqcPl+pvmM332LkeXynOygmP2mIC4kVO+fyn+YTffYuT5eqewJoJ7G9jiZY2224ruAXCip5vl6pze1BObC5s5mQG88lx5/ab5jN99i5gFxIqdPl9pvmM332J5/ab5jN99iAuJFVGivLrRSSNjlp5YWuIb0hLHNbfe6xuBzF1aoN8xsQHZFwiA5RcIgOUXCIDlERAEREAWob529PVB7b4p5Cfvu/wB8eBC28WnNb8IqPrpPzuVtHx8kZ9D51mjr9aI3HDf/AK/77VmfJXoSKrr2x1ADo42OmLDseWEBrTxF3AkbwFg2ucXBrAS4nCAMyScgABtJ4KY0OrekqZ8dYxjGzs6wGNheQRZzXtJD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WrnRS3M5hFTDyPS/SjvwW/zXI8j8v0o78Fv81bCLm5jCKo80M30o78Fv8lz5oZvpR34Lf5K1kXdzGEVT5opvpR34Lf5J5opvpR34Lf5K1kXNzGEVdD5KqhgszSxAuT/yIzmdpzK+nmxqvpd3/TxfurNRd3MYRWXmxq/pd3/TxfuukvksqXAtdpYlpyI9zx5+BVoIm5jCKp80U30o78Fv8k80U30o78Fv8layJuYwiqPNDN9KO/Bb/JPNDN9KO/Bb/JWuibmMIqfzQS/SjvwW/wAlx5npfpR34Lf5q2UXNzGEU3V+SGsBHRV7HN3l7Swg8gA6/ivjF5HKwuAkrY2s3loc533S1oPirqRd3MYRWmq3kpNJUMndXmRrSHFgiDcRaQ5t3YjYBwB2blZaIuN5OhERcAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQH//2Q==",
    title: "Apple MacBook Pro M3",
    description:
      "Powerful Apple MacBook Pro with M3 chip, 8-core CPU, 10-core GPU, 8GB unified memory and 512GB SSD — ideal for professionals and creatives.",
    category: "Electronics",
    price: 149900,
    discountPercentage: 5,
    rating: 4.9,
    stock: 15,
    tags: ["macbook", "apple", "M3", "laptop", "pro"],
    brand: "Apple",
    sku: "MBPM3-2023",
    weight: 1.56,
    dimensions: { width: 31.26, height: 1.15, depth: 22.12 },
    warrantyInformation:
      "1 year Apple Limited Warranty with 90 days of support",
    shippingInformation: "Free shipping in 1–3 business days",
    availabilityStatus: "In Stock",
    reviews: [],
    returnPolicy: "14 days return policy (Apple standard)",
    minimumOrderQuantity: 1,
    meta: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      barcode: "MBP-M3-123456789",
      qrCode: "https://www.apple.com/in/macbook-pro/",
    },
    thumbnail: "#",
  },
  {
    id: 1,
    imageUrl:
      "https://rukminim2.flixcart.com/image/312/312/xif0q/computer/f/w/u/-original-imahbwnhkgr5p46r.jpeg?q=70",
    title: "Laptop",
    description:
      "This is a HP Victus Gaming Laptop i5 12th gen 8GB RAM 512Gb ROM",
    category: "Electronics",
    price: 70000,
    discountPercentage: 10,
    rating: 4.5,
    stock: 10,
    tags: ["laptop", "gaming", "HP"],
    brand: "HP",
    sku: "HPVIC123",
    weight: 2.2,
    dimensions: { width: 35, height: 2, depth: 25 },
    warrantyInformation: "1 year manufacturer warranty",
    shippingInformation: "Ships in 2-3 days",
    availabilityStatus: "In Stock",
    reviews: [],
    returnPolicy: "30 days return",
    minimumOrderQuantity: 1,
    meta: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      barcode: "1234567890",
      qrCode: "https://example.com/qr",
    },
    thumbnail: "#",
  },
  {
    id: 1,
    imageUrl:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUQEBAWFRAWGBcSFxgYGRYaGBgXFxUWGBYWFxgYHiggGRolGxgWITEiJyktLi4uFyAzODMsNygtLisBCgoKDg0OGxAQGy4lHyYvLTItNzctKy8tNS8vLTUtLS0vMC8tKy8tLy8vLS8tLS0tLy0vKy0tLS0tLy0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAgIDAQAAAAAAAAAAAAAABgcFCAECBAP/xABKEAABAwICBgUFDwIEBQUAAAABAAIDBBESIQUGMUFRYRMicYGRBxcyobEUIzRCUlRVc4KSk7LB0dJichVT4fAWM5TC8SRDY4Oi/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAIDBAEFBv/EADARAAICAQMBBQcDBQAAAAAAAAABAgMRBBIhMRNBUWGBFCIycbHR8JGh8QUVI8Hh/9oADAMBAAIRAxEAPwC8UREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBEVaaz+WajpKh9MyGSd8ZLXuZhDA4ZOaCTckHI5WQFloqd8/tN8xm++xPP7TfMZvvsQFxIqgPl4gw4/8OnwHIOxNse+1l0Pl9pxtoJh9tiAuJFTnn+pvmM332LsfL1BYH/D57G9jiZY222O9AXCipzz/AFN8xm++xPP9TfMZvvsQFxoqcPl+pvmM332LkeXynOygmP2mIC4kVO+fyn+YTffYuT5eqewJoJ7G9jiZY2224ruAXCip5vl6pze1BObC5s5mQG88lx5/ab5jN99i5gFxIqdPl9pvmM332J5/ab5jN99iAuJFVGivLrRSSNjlp5YWuIb0hLHNbfe6xuBzF1aoN8xsQHZFwiA5RcIgOUXCIDlERAEREAWob529PVB7b4p5Cfvu/wB8eBC28WnNb8IqPrpPzuVtHx8kZ9D51mjr9aI3HDf/AK/77VmfJXoSKrr2x1ADo42OmLDseWEBrTxF3AkbwFg2ucXBrAS4nCAMyScgABtJ4KY0OrekqZ8dYxjGzs6wGNheQRZzXtJD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WrnRS3M5hFTDyPS/SjvwW/zXI8j8v0o78Fv81bCLm5jCKo80M30o78Fv8lz5oZvpR34Lf5K1kXdzGEVT5opvpR34Lf5J5opvpR34Lf5K1kXNzGEVdD5KqhgszSxAuT/yIzmdpzK+nmxqvpd3/TxfurNRd3MYRWXmxq/pd3/TxfuukvksqXAtdpYlpyI9zx5+BVoIm5jCKp80U30o78Fv8k80U30o78Fv8layJuYwiqPNDN9KO/Bb/JPNDN9KO/Bb/JWuibmMIqfzQS/SjvwW/wAlx5npfpR34Lf5q2UXNzGEU3V+SGsBHRV7HN3l7Swg8gA6/ivjF5HKwuAkrY2s3loc533S1oPirqRd3MYRWmq3kpNJUMndXmRrSHFgiDcRaQ5t3YjYBwB2blZaIuN5OhERcAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQH//2Q==",
    title: "Apple MacBook Pro M3",
    description:
      "Powerful Apple MacBook Pro with M3 chip, 8-core CPU, 10-core GPU, 8GB unified memory and 512GB SSD — ideal for professionals and creatives.",
    category: "Electronics",
    price: 149900,
    discountPercentage: 5,
    rating: 4.9,
    stock: 15,
    tags: ["macbook", "apple", "M3", "laptop", "pro"],
    brand: "Apple",
    sku: "MBPM3-2023",
    weight: 1.56,
    dimensions: { width: 31.26, height: 1.15, depth: 22.12 },
    warrantyInformation:
      "1 year Apple Limited Warranty with 90 days of support",
    shippingInformation: "Free shipping in 1–3 business days",
    availabilityStatus: "In Stock",
    reviews: [],
    returnPolicy: "14 days return policy (Apple standard)",
    minimumOrderQuantity: 1,
    meta: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      barcode: "MBP-M3-123456789",
      qrCode: "https://www.apple.com/in/macbook-pro/",
    },
    thumbnail: "#",
  },
];

const ProductPage = () => {
  return (
    <div className="w-full  bg-[#101820] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center px-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          imageUrl={product.imageUrl}
          title={product.title}
          description={product.description}
          price={product.price}
        />
      ))}
    </div>
  );
};

export default ProductPage;
