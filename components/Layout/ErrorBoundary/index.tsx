'use client'
import { Component, ErrorInfo, ReactNode } from 'react'
import Button from '~/components/Layout/Button'
import Container from '~/components/Layout/Container'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null // Store errorInfo for the stack trace
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    error: null,
    hasError: false,
    errorInfo: null, // Initialize errorInfo
  }

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error, errorInfo: null } // Initialize errorInfo here, too, in case componentDidCatch isn't called.
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
    this.setState({ errorInfo })
  }

  public render() {
    if (this.state.hasError) {
      return (
        <section>
          <Container className="flex min-h-svh flex-col items-center justify-center py-20">
            <h1 className="mb-2 text-center">
              <b>An error occurred. Please contact the developer.</b>
            </h1>
            <div className="bg-grey-800 w-[calc(100vw-64px)] max-w-[500px] rounded-md p-4">
              <p className="mb-2">Error:</p>
              {/* Display the error message directly */}
              <code className="!bg-grey-700 !text-grey-100 block !px-2 whitespace-pre-wrap">
                {this.state.error?.message}
              </code>

              {/* Conditionally render the stack trace */}
              {this.state.errorInfo && (
                <>
                  <p className="mt-4 mb-2">Stack Trace:</p>
                  <code className="limit-lines !bg-grey-700 !text-grey-100 mb-4 block !px-2 break-words whitespace-pre-wrap">
                    {this.state.errorInfo.componentStack}
                  </code>
                  <Button
                    onClick={() => window.location.reload()}
                    className="mx-auto"
                  >
                    Reload page
                  </Button>
                  <style>
                    {`
                      .limit-lines {
                         overflow: hidden;
                        display: -webkit-box;
                        -webkit-line-clamp: 10; /* number of lines to show */
                                line-clamp: 10; 
                        -webkit-box-orient: vertical;
                    }
                    `}
                  </style>
                </>
              )}
            </div>
          </Container>
        </section>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
