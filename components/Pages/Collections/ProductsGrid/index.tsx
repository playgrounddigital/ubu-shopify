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
        {/* Filter button */}
        {/* <div className="mb-10 flex justify-between">
          <button className="flex h-[34px] items-center gap-x-2.5 rounded-full bg-yellow px-4 uppercase">
            <FilterIcon className="h-3.5 w-4.5" />
            <span>Filter</span>
          </button>

          <button className="flex h-[34px] items-center gap-x-2.5 rounded-full bg-black px-4 text-white uppercase">
            <span>Most Popular</span>
            <ChevronDownIcon className="h-1.5 w-3" />
          </button>
        </div> */}

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
