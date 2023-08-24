---
title: NavLink
toc: false
---

# `<NavLink>`

A `<NavLink>` is a special kind of [`<Link>`][link] that knows whether or not it is "active" or "pending". This is useful when building a navigation menu, such as a breadcrumb or a set of tabs where you'd like to show which of them is currently selected. It also provides useful context for assistive technology like screen readers.

```tsx
import { NavLink } from "@remix-run/react";

<NavLink
  to="/messages"
  className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "active" : ""
  }
>
  Messages
</NavLink>;
```

## Default `active` class

By default, an `active` class is added to a `<NavLink>` component when it is active so you can use CSS to style it.

```tsx
<nav id="sidebar">
  <NavLink to="/messages" />
</nav>
```

```css
#sidebar a.active {
  color: red;
}
```

## `className`

The `className` prop works like a normal className, but you can also pass it a function to customize the classNames applied based on the active and pending state of the link.

```tsx
<NavLink
  to="/messages"
  className={({ isActive, isPending }) =>
    isPending ? "pending" : isActive ? "active" : ""
  }
>
  Messages
</NavLink>
```

## `style`

The `style` prop works like a normal style prop, but you can also pass it a function to customize the styles applied based on the active and pending state of the link.

```tsx
<NavLink
  to="/messages"
  style={({ isActive, isPending }) => {
    return {
      fontWeight: isActive ? "bold" : "",
      color: isPending ? "red" : "black",
    };
  }}
>
  Messages
</NavLink>
```

## `children`

You can pass a render prop as children to customize the content of the `<NavLink>` based on the active and pending state, which is useful to change styles on internal elements.

```tsx
<NavLink to="/tasks">
  {({ isActive, isPending }) => (
    <span className={isActive ? "active" : ""}>Tasks</span>
  )}
</NavLink>
```

## `end`

The `end` prop changes the matching logic for the `active` and `pending` states to only match to the "end" of the NavLinks's `to` path. If the URL is longer than `to`, it will no longer be considered active.

| Link                          | URL          | isActive |
| ----------------------------- | ------------ | -------- |
| `<NavLink to="/tasks" />`     | `/tasks`     | true     |
| `<NavLink to="/tasks" />`     | `/tasks/123` | true     |
| `<NavLink to="/tasks" end />` | `/tasks`     | true     |
| `<NavLink to="/tasks" end />` | `/tasks/123` | false    |

**A note on links to the root route**

`<NavLink to="/">` is an exceptional case because _every_ URL matches `/`. To avoid this matching every single route by default, it effectively ignores the `end` prop and only matches when you're at the root route.

## `caseSensitive`

Adding the `caseSensitive` prop changes the matching logic to make it case sensitive.

| Link                                         | URL           | isActive |
| -------------------------------------------- | ------------- | -------- |
| `<NavLink to="/SpOnGe-bOB" />`               | `/sponge-bob` | true     |
| `<NavLink to="/SpOnGe-bOB" caseSensitive />` | `/sponge-bob` | false    |

## `aria-current`

When a `NavLink` is active it will automatically apply `<a aria-current="page">` to the underlying anchor tag. See [aria-current][aria-current] on MDN.

[aria-current]: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current
[link]: ./link.md
