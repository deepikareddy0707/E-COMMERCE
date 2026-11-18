import { Component } from 'react'

export class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="grid min-h-screen place-items-center bg-slate-50 px-4 text-center dark:bg-slate-950">
          <div>
            <h1 className="text-3xl font-bold text-slate-950 dark:text-white">Something went wrong</h1>
            <p className="mt-3 max-w-md text-slate-600 dark:text-slate-300">
              Refresh the page or return home to continue shopping.
            </p>
            <a className="btn-primary mt-6" href="/">Go home</a>
          </div>
        </main>
      )
    }
    return this.props.children
  }
}
