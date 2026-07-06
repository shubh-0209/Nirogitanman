import * as React from "react";
import { useFormContext } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";

interface EditableFieldProps {
  name: string;
  label: string;
  isEditing: boolean;
  type?: string;
  inputType?: "text" | "textarea" | "number" | "select" | "radio" | "switch" | "date";
  placeholder?: string;
  options?: { label: string; value: string }[];
  valueFormatter?: (value: unknown) => string;
}

export function EditableField({
  name,
  label,
  isEditing,
  type = "text",
  inputType = "text",
  placeholder,
  options = [],
  valueFormatter,
}: EditableFieldProps) {
  const { control, watch } = useFormContext();
  const value = watch(name);
  
  const displayValue = valueFormatter 
    ? valueFormatter(value) 
    : (typeof value === "boolean" ? (value ? "Yes" : "No") : (value || "Not Provided"));

  if (!isEditing) {
    return (
      <div className="space-y-1">
        <Label className="text-muted-foreground text-xs font-medium uppercase tracking-wider">{label}</Label>
        <p className="text-sm font-medium text-foreground">{displayValue}</p>
      </div>
    );
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          {inputType !== "switch" && <FormLabel>{label}</FormLabel>}
          
          {inputType === "text" && (
            <FormControl>
              <Input type={type} placeholder={placeholder} {...field} value={field.value || ""} />
            </FormControl>
          )}

          {inputType === "number" && (
            <FormControl>
              <Input 
                type="number" 
                placeholder={placeholder} 
                {...field} 
                value={field.value ?? ""} 
                onChange={(e) => field.onChange(e.target.value === "" ? undefined : Number(e.target.value))}
              />
            </FormControl>
          )}

          {inputType === "textarea" && (
            <FormControl>
              <Textarea 
                placeholder={placeholder} 
                className="resize-none" 
                {...field} 
                value={field.value || ""} 
              />
            </FormControl>
          )}

          {inputType === "select" && (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={placeholder || `Select ${label}`} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {inputType === "radio" && (
            <FormControl>
              <RadioGroup
                onValueChange={(val) => field.onChange(val === "true" ? true : val === "false" ? false : val)}
                defaultValue={field.value === true ? "true" : field.value === false ? "false" : field.value}
                className="flex flex-col space-y-1 mt-2"
              >
                {options.map((option) => (
                  <FormItem key={option.value} className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={option.value} />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {option.label}
                    </FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
          )}

          {inputType === "switch" && (
            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm mt-2">
              <div className="space-y-0.5">
                <FormLabel>{label}</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={!!field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </div>
          )}

          {inputType === "date" && (
            <Popover>
              <FormControl>
                <PopoverTrigger render={
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  />
                }>
                  {field.value ? (
                    format(new Date(field.value), "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </PopoverTrigger>
              </FormControl>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value ? new Date(field.value) : undefined}
                  onSelect={(date) => field.onChange(date ? format(date, "yyyy-MM-dd") : undefined)}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                />
              </PopoverContent>
            </Popover>
          )}

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
