import { Component, type ReactNode } from "react";

/** Keeps a WebGL failure from ever taking down the portfolio content. */
export class SceneBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { failed: boolean }
> {
  override state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  override componentDidCatch(error: unknown) {
    console.warn("3D scene disabled:", error);
  }

  override render() {
    if (this.state.failed)
      return (
        this.props.fallback ?? (
          <div aria-hidden className="absolute inset-0 accent-glow opacity-70" />
        )
      );
    return this.props.children;
  }
}
