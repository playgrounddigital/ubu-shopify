import { FC } from 'react'
import Container from '~/components/Layout/Container'
import useBreakpoints from '~/hooks/useBreakpoints'

interface SearchBarProps {
  hasResults: boolean
  searchQuery: string
  setSearchQuery: (query: string) => void
}

const SearchBar: FC<SearchBarProps> = ({ hasResults, searchQuery, setSearchQuery }) => {
  const { isMobile } = useBreakpoints()

  return (
    <section className="bg-black">
      <Container className="flex flex-col justify-center pt-20 pb-10 md:items-center">
        {/* Products */}
        <input
          id="search"
          name="search"
          type="search"
          placeholder={isMobile ? 'Search products...' : 'What are you looking for?'}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="body-large mx-auto w-full max-w-[1200px] border-b-4 border-white pb-4 text-white placeholder:text-white/50 md:pb-10 md:text-center md:text-[48px] md:leading-[58px] md:-tracking-[1.44px]"
        />

        {!hasResults && (
          <p className="body-large md:text-general-title mt-6 text-white/50 md:mt-10">
            No results found for "{searchQuery}"
          </p>
        )}
      </Container>
    </section>
  )
}

export default SearchBar
