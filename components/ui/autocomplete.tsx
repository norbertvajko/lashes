"use client"

import {CommandGroup, CommandItem, CommandList, CommandInput} from "@/components/ui/command"
import {Command as CommandPrimitive} from "cmdk"
import {useState, useRef, useCallback, type KeyboardEvent} from "react"

import {cn} from "@/lib/utils"
import {Check} from "lucide-react"
import {Skeleton} from "@/components/ui/skeleton"
import useWindowWidth from "@/hooks/use-window-width"

export type Option = Record<"value" | "label", string> & Record<string, string>

type AutoCompleteProps = {
    className?: string
    options: Option[]
    emptyMessage: string | React.ReactNode
    value?: Option
    onValueChange?: (value: Option) => void
    onChange?: (e?: any) => void
    isLoading?: boolean
    disabled?: boolean
    placeholder?: string
    onBlur?: () => void;
    onFocus?: () => void;
    beforeEndorsment?: React.ReactNode;
}

export const AutoComplete = ({
                                 className,
                                 options,
                                 placeholder,
                                 emptyMessage,
                                 value,
                                 onValueChange,
                                 onChange,
                                 disabled,
                                 isLoading = false,
                                 onBlur,
                                 onFocus,
                                 beforeEndorsment,
                             }: AutoCompleteProps) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const [isOpen, setOpen] = useState(false)
    const [selected, setSelected] = useState<Option>(value as Option)
    const [inputValue, setInputValue] = useState<string>(value?.label || "")
    const [isFiltersVisible, setIsFiltersVisible] = useState(false);

    const { isMobile } = useWindowWidth();

    const handleKeyDown = useCallback(
        (event: KeyboardEvent<HTMLDivElement>) => {
            const input = inputRef.current
            if (!input) {
                return
            }

            // Keep the options displayed when the user is typing
            if (!isOpen) {
                setOpen(true)
            }

            // This is not a default behaviour of the <input /> field
            if (event.key === "Enter" && input.value !== "") {
                const optionToSelect = options.find((option) => option.label === input.value)
                if (optionToSelect) {
                    setSelected(optionToSelect)
                    onValueChange?.(optionToSelect)
                }
            }

            if (event.key === "Escape") {
                input.blur()
            }
        },
        [isOpen, options, onValueChange]
    )

    const handleBlur = useCallback(() => {
        setOpen(false);

        setInputValue("");
        // setInputValue(selected?.label)
        onBlur?.(); // Call onBlur prop if provided
    }, [onBlur]);

    const handleSelectOption = useCallback(
        (selectedOption: Option) => {
            setInputValue("");
            // setInputValue(selectedOption.label)

            setSelected(selectedOption)
            onValueChange?.(selectedOption)

            // This is a hack to prevent the input from being focused after the user selects an option
            // We can call this hack: "The next tick"
            setTimeout(() => {
                inputRef?.current?.blur()
            }, 0)
        },
        [onValueChange]
    )

    return (
        <div className={cn("border border-[#FFD700] border-opacity-30", className)}>
            <CommandPrimitive onChange={onChange} onKeyDown={handleKeyDown} className={className}>
                    <CommandInput
                        ref={inputRef}
                        value={inputValue}
                        onValueChange={isLoading ? undefined : setInputValue}
                        placeholder={placeholder}
                        disabled={disabled}
                        className={"text-base"}
                        onBlur={handleBlur}
                        onFocus={() => {
                            setOpen(true); 
                            onFocus?.(); 
                            setIsFiltersVisible(true);
                        }}
                        beforeEndorsment={beforeEndorsment}
                    />
                <div className="mt-1 relative">
                    {isOpen ? (
                        <div className="absolute top-0 left-[-0.5px] w-full z-10 animate-in fade-in-0 zoom-in-95">
                            <CommandList style={isMobile ? { width: 'calc(100% + 2px)' } : {}}>
                                {isLoading ? (
                                    <CommandPrimitive.Loading>
                                        <div className="p-1">
                                            <Skeleton className="h-8 w-full"/>
                                        </div>
                                    </CommandPrimitive.Loading>
                                ) : null}
                                {options.length > 0 && !isLoading ? (
                                    <CommandGroup className="flex flex-col bg-slate-50 dark:bg-slate-950">
                                        {options.map((option, index) => {
                                            const isSelected = selected?.value === option.value
                                            return (
                                                <CommandItem
                                                    key={`${option.value}-${index}`}
                                                    value={option.label}
                                                    onMouseDown={(event) => {
                                                        event.preventDefault()
                                                        event.stopPropagation()
                                                    }}
                                                    onSelect={() => handleSelectOption(option)}
                                                    className={cn("flex items-center gap-2 h-fit w-full cursor-pointer", !isSelected ? "pl-8" : null)}
                                                >
                                                    {isSelected ? <Check className="w-4"/> : null}
                                                    {option.label}
                                                </CommandItem>
                                            )
                                        })}
                                    </CommandGroup>
                                ) : null}
                                {!isLoading ? (
                                    <CommandPrimitive.Empty
                                        className="bg-slate-50 border-t-0 border pr-5 border-[#FFD700] border-opacity-30 dark:bg-slate-900 select-none pb-1 text-sm text-center">
                                        {typeof emptyMessage === 'string' ? emptyMessage : emptyMessage}
                                    </CommandPrimitive.Empty>
                                ) : null}
                            </CommandList>
                        </div>
                    ) : null}
                </div>
            </CommandPrimitive>
        </div>
    )
}