import prisma from "@/app/lib/db";
import exp from "constants";

export async function findAllProduct() {
    return await prisma.product.findMany({
        orderBy: {id: "desc"}
    })
}
export function findByIdProduct(id: string){
    return prisma.product.findUnique({
        where: { id: id}
    })
}
export function createProduct(){

}
export function updateProudct(){

}
export function removeProduct(){

}