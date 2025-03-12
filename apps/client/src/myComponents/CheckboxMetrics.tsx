import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "react-hot-toast"; // Use the toast from react-hot-toast
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useNavigate } from "react-router-dom"; // **Change 1: Import `useNavigate`**

export function CheckboxMetrics({ city }) {
  const navigate = useNavigate(); // **Change 2: Initialize `useNavigate` hook**

  const items = [
    { id: "humidity", label: "Humidity(%)" },
    { id: "pressure", label: "Pressure(hPa)" },
    { id: "temperature", label: "Temperature(Celsius)" },
    { id: "co", label: "CO: Carbon Monoxide Concentration (μg/m3)" },
    { id: "nh3", label: "NH₃: Ammonia Concentration (μg/m3)" },
    { id: "no", label: "NO: Nitrogen Monoxide Concentration (μg/m3)" },
    { id: "o3", label: "O₃: Ozone Concentration (μg/m3)" },
    { id: "pm2_5", label: "PM2.5: Fine Particles Matter Concentration" },
    { id: "pm10", label: "PM10: Coarse Particulate Matter Concentration" },
    { id: "so2", label: "SO₂: Sulphur Dioxide Concentration (μg/m3)" },
  ] as const;

  const FormSchema = z.object({
    items: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: [],
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.success("Form submitted successfully!", {
      icon: "🎉",
      duration: 4000,
      style: { backgroundColor: "#333", color: "#fff" },
    });

    const queryParams = new URLSearchParams();
    queryParams.set("metrics", data.items.join(","));

    // **Use setTimeout to delay navigation slightly**
    setTimeout(() => {
      navigate(`/metrics/${city}/historical?${queryParams.toString()}`);
    }, 100);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">
                  Weather and Air Quality
                </FormLabel>
                <FormDescription>
                  Check the items you want to see their historical values.
                </FormDescription>
              </div>
              {items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="items"
                  render={({ field }) => (
                    <FormItem
                      key={item.id}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(item.id)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, item.id])
                              : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== item.id
                                  )
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        {item.label}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
