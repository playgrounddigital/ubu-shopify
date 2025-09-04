import cx from 'classnames'
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
      <Container className="flex flex-col items-center justify-center pt-12 pb-10 md:pt-20">
        {/* Products */}
        <input
          id="search"
          name="search"
          type="search"
          placeholder={isMobile ? 'Search products...' : 'What are you looking for?'}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mx-auto w-full max-w-[1200px] border-b-4 border-white pb-3.5 text-center font-semibold text-white placeholder:text-white/50 md:pb-10 md:text-[48px] md:leading-[58px] md:-tracking-[1.44px]"
        />

        {!hasResults && (
          <p
            className={cx('mt-2 text-white md:mt-7', {
              'text-subheading': !isMobile,
              'text-[10px] leading-3 font-semibold -tracking-[0.3px]': isMobile,
            })}
          >
            No results found for "{searchQuery}"
          </p>
        )}
      </Container>
    </section>
  )
}

export default SearchBar
