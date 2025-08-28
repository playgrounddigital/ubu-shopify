import { FC } from 'react'
import Container from '~/components/Layout/Container'
import ProductCard from '~/components/Pages/Shared/ProductCard'
import { Product } from '~/types/shopify'

interface ProductsGridProps {
  products: Product[]
}

const ProductsGrid: FC<ProductsGridProps> = ({ products }) => {
  return (
    <section>
      <Container className="pt-20">
        {/* Products */}
        <div className="mb-[120px] grid grid-cols-4 gap-x-10 gap-y-[100px]">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}

export default ProductsGrid
