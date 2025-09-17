import cx from 'classnames'
import {
  StructuredText as StructuredTextType,
  isHeading,
  isLink,
  isList,
  isListItem,
  isParagraph,
} from 'datocms-structured-text-utils'
import { FC, Fragment } from 'react'
import { StructuredText, renderMarkRule, renderNodeRule } from 'react-datocms'
import PageLink from '~/components/Layout/PageLink'
import { joinSmartTagsIntoString } from '~/helpers/cms'

interface StructuredTextRendererProps {
  data: StructuredTextType
  paragraphClassName?: string
  headingTwoClassName?: string
}

const StructuredTextRenderer: FC<StructuredTextRendererProps> = ({ data, paragraphClassName, headingTwoClassName }) => (
  <StructuredText
    data={data}
    customNodeRules={[
      // Headings
      renderNodeRule(isHeading, ({ node, children, key }) => {
        switch (node.level) {
          // Do not allow multiple h1 tags in the markdown, convert to h2
          case 1:
          case 2:
            return (
              <h2
                key={key}
                className={cx(headingTwoClassName, {
                  'text-heading mt-10 mb-4 font-medium': !headingTwoClassName,
                })}
              >
                {children}
              </h2>
            )
          case 3:
            return (
              <h3
                key={key}
                className="mt-6 mb-4 text-xl font-medium first:mt-0"
              >
                {children}
              </h3>
            )
          case 4:
            return <h4 key={key}>{children}</h4>
          default:
            return null
        }
      }),
      // Paragraphs
      renderNodeRule(isParagraph, ({ adapter: { renderNode }, ancestors, children, key }) => {
        if (ancestors[0]?.type === 'listItem') {
          return <Fragment key={key}>{children}</Fragment>
        }
        return renderNode(
          'p',
          {
            key,
            className: cx('mb-3 last:mb-0', paragraphClassName),
          },
          children
        )
      }),
      // Lists
      renderNodeRule(isList, ({ node, children, key }) => {
        switch (node.style) {
          case 'bulleted':
            return (
              <ul
                key={key}
                className={cx('mb-8 flex list-disc flex-col gap-y-2 pl-6', paragraphClassName)}
              >
                {children}
              </ul>
            )
          case 'numbered':
            return (
              <ol
                key={key}
                className={cx('mb-8 flex list-decimal flex-col gap-y-2 pl-6', paragraphClassName)}
              >
                {children}
              </ol>
            )
          default:
            return null
        }
      }),
      // List items
      renderNodeRule(isListItem, ({ children, key }) => <li key={key}>{children}</li>),
      // External links
      renderNodeRule(isLink, ({ node, children, key }) => (
        <PageLink
          key={key}
          href={node.url}
          className="underline"
        >
          {children}
        </PageLink>
      )),
    ]}
    customMarkRules={[renderMarkRule('strong', ({ children, key }) => <b key={key}>{children}</b>)]}
    renderInlineBlock={({ record }: { record: any }) => {
      switch (record.__typename) {
        case 'ImageRecord':
          return (
            <img
              src={record.image.url}
              alt={record.image.alt || joinSmartTagsIntoString(record.image.smartTags)}
              className="mr-0.5 inline-block h-4.5 w-[60px] md:mr-2 md:h-9 md:w-[117px]"
            />
          )
        default:
          return null
      }
    }}
  />
)

export default StructuredTextRenderer
