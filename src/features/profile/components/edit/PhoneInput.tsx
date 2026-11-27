"use client";

import { useState } from "react";
import { CircleHelp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const countries = [
  { code: "eg", name: "Egypt", dial: "+20" },
  { code: "sa", name: "Saudi Arabia", dial: "+966" },
  { code: "ae", name: "UAE", dial: "+971" },
];

function Flag({ code }: { code: string }) {
  return (
    <img
      src={`https://flagcdn.com/${code}.svg`}
      alt=""
      className="size-5 rounded-full object-cover"
    />
  );
}

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function PhoneInput({ value, onChange }: Props) {
  const [country, setCountry] = useState("eg");

  const match = countries.find((c) => value.startsWith(c.dial));
  const selected = match ?? countries.find((c) => c.code === country)!;
  const number = match ? value.slice(match.dial.length) : value;

  function update(dial: string, input: string) {
    const digits = input.replace(/\D/g, "").replace(/^0+/, "");
    onChange(digits ? `${dial}${digits}` : "");
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="phone" className="text-sm font-semibold text-gray-900">
        Phone Number
      </Label>

      <div className="flex h-12 overflow-hidden rounded-full border border-slate-300 bg-white focus-within:ring-2 focus-within:ring-blue-200">
        <Select
          value={selected.code}
          onValueChange={(code) => {
            const next = countries.find((c) => c.code === code);
            if (!next) return;
            setCountry(next.code);
            if (number) update(next.dial, number);
          }}
        >
          <SelectTrigger
            aria-label="Country code"
            className="!h-full w-[69px] shrink-0 gap-2 rounded-none border-0 border-r border-slate-300 bg-slate-50 px-3 shadow-none"
          >
            <SelectValue>
              <Flag code={selected.code} />
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="bg-white">
            {countries.map((c) => (
              <SelectItem key={c.code} value={c.code}>
                <Flag code={c.code} />
                {c.name} ({c.dial})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <span className="flex items-center pl-3 text-base font-semibold text-slate-700">
          {selected.dial}
        </span>

        <Input
          id="phone"
          type="tel"
          value={number}
          onChange={(e) => update(selected.dial, e.target.value)}
          placeholder="1012345678"
          className="h-full min-w-0 flex-1 border-0 bg-transparent px-2 text-base text-slate-600 shadow-none focus-visible:ring-0 md:text-base"
        />

        <span
          title="Enter your number without the country code"
          className="flex items-center pr-3"
        >
          <CircleHelp className="size-[18px] text-slate-300" />
        </span>
      </div>
    </div>
  );
}