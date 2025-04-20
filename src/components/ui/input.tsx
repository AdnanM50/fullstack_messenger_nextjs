"use client"

import type * as React from "react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export function FormInput({ className, type = "text", label, id, required, ...props }: FormInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`

  // Handle hydration mismatch by only running animations after mount
  useEffect(() => {
    setIsMounted(true)
    // Check if there's an initial value
    setHasValue(!!props.value || !!props.defaultValue)
  }, [props.value, props.defaultValue])

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true)
    props.onFocus?.(e)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false)
    setHasValue(!!e.target.value)
    props.onBlur?.(e)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(!!e.target.value)
    props.onChange?.(e)
  }

  const isActive = isMounted && (isFocused || hasValue)

  return (
    <div className="relative">
      <label
        htmlFor={inputId}
        className={cn(
          "absolute left-3 transition-all duration-200 pointer-events-none",
          isActive
            ? "text-xs -translate-y-[1.25rem] text-primary"
            : "text-muted-foreground text-base translate-y-[0.35rem]",
        )}
      >
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      <input
        id={inputId}
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-14 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pt-5",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className,
        )}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder=""
        {...props}
      />
    </div>
  )
}
