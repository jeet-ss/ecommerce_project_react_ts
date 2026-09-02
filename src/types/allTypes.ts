type ImageExtension = 'png' | 'jpg' | 'jpeg';

export type Product = {
    id: string,
    image: `${string}.${ImageExtension}`,
    name: string,
    rating: {
        stars: number,
        count: number,
    },
    priceCents: number,
    keywords: string[],
    createdAt: string,
    updatedAt: string
};

export type CartItem = {
    productId: string;
    quantity: number;
    deliveryOptionId: string;
    createdAt: string;
    updatedAt: string;
};

export type CartItemWithProduct = CartItem & {
    product: Product
};

export type Cart = CartItem[];

export type CartWithProduct = CartItemWithProduct[];

export type LoadCart = () => Promise<void>;

export type OrderProduct = {
    productId: string,
    quantity: 1,
    estimatedDeliveryTimeMs: number,
    product: Product
};

export type Order = {
    id: string;
    orderTimeMs: number;
    totalCostCents: number;
    products: OrderProduct[]
};

export type Orders = Order[];

export type DeliveryOptions = {
    id: string;
    deliveryDays: number;
    priceCents: number;
    createdAt: string;
    updatedAt: string;
}[];


