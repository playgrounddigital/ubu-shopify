import { FC } from 'react'
import AnimateOnUpdate from '~/components/Layout/AnimateOnUpdate'
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
        <AnimateOnUpdate
          updateKey={products.length}
          className="mb-[120px] grid grid-cols-2 gap-x-2.5 gap-y-9 md:gap-x-10 md:gap-y-[100px] lg:grid-cols-3 xl:grid-cols-4"
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </AnimateOnUpdate>
      </Container>
    </section>
  )
}

export default ProductsGrid
