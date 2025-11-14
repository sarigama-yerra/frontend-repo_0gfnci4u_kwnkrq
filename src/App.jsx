import { useEffect, useMemo, useRef, useState } from "react";
import { Bike, Bell, ShoppingCart, User, Star, BadgePercent, Truck } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Avatar } from "./components/ui/avatar";

const DEMO_BIKES = [
  {
    id: 1,
    name: "Canyon Endurace CF 7",
    price: 2199,
    distance: "1.2 mi",
    store: "Cycle City",
    discount: 10,
    rating: 4.6,
    reviews: 128,
    shipping: "Free 2-day",
    image:
      "https://images.unsplash.com/photo-1595435978701-5b6f51964b9f?q=80&w=1400&auto=format&fit=crop",
    category: "road",
  },
  {
    id: 2,
    name: "Specialized Sirrus X 4.0",
    price: 1499,
    distance: "0.6 mi",
    store: "Urban Bikes",
    discount: 0,
    rating: 4.4,
    reviews: 93,
    shipping: "Free pickup",
    image:
      "https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?q=80&w=1400&auto=format&fit=crop",
    category: "hybrid",
  },
  {
    id: 3,
    name: "Trek Marlin 8 Gen 3",
    price: 1299,
    distance: "3.4 mi",
    store: "TrailWorks",
    discount: 15,
    rating: 4.7,
    reviews: 211,
    shipping: "Ships in 3–5 days",
    image:
      "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=1400&auto=format&fit=crop",
    category: "mountain",
  },
  {
    id: 4,
    name: "Cannondale Synapse Neo",
    price: 3299,
    distance: "2.1 mi",
    store: "Volt Cycles",
    discount: 5,
    rating: 4.5,
    reviews: 75,
    shipping: "Free 2-day",
    image:
      "https://images.unsplash.com/photo-1520975922284-6c0a1b36a4a3?q=80&w=1400&auto=format&fit=crop",
    category: "electric",
  },
  {
    id: 5,
    name: "Giant Talon 2",
    price: 899,
    distance: "0.9 mi",
    store: "Peak Performance",
    discount: 0,
    rating: 4.2,
    reviews: 60,
    shipping: "Ships tomorrow",
    image:
      "https://images.unsplash.com/photo-1526413232644-8a32a2ae0391?q=80&w=1400&auto=format&fit=crop",
    category: "mountain",
  },
  {
    id: 6,
    name: "Ribble CGR SL",
    price: 2599,
    distance: "4.7 mi",
    store: "Ribble Store",
    discount: 8,
    rating: 4.8,
    reviews: 189,
    shipping: "Free 2-day",
    image:
      "https://images.unsplash.com/photo-1541620312-0b3b3c433d2b?q=80&w=1400&auto=format&fit=crop",
    category: "road",
  },
];

function TopBar() {
  return (
    <div className="sticky top-0 z-30 w-full border-b border-neutral-800 bg-neutral-950/70 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/60">
      <div className="mx-auto flex h-14 items-center justify-between px-3 sm:px-6">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 grid place-items-center rounded-md bg-blue-500/10 text-blue-400">
            <Bike className="h-4 w-4" />
          </div>
          <span className="text-neutral-100 font-semibold tracking-tight">BikeShop</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Cart">
            <ShoppingCart className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Account">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function CategoryTabs({ value, onValueChange }) {
  const tabs = [
    { value: "road", label: "Road" },
    { value: "hybrid", label: "Hybrid" },
    { value: "mountain", label: "Mountain" },
    { value: "electric", label: "Electric" },
    { value: "gravel", label: "Gravel" },
  ];
  return (
    <Tabs value={value} onValueChange={onValueChange} className="w-full">
      <div className="mx-auto w-full px-3 sm:px-6">
        <div className="py-3">
          <TabsList className="w-full justify-start overflow-x-auto">
            {tabs.map((t) => (
              <TabsTrigger key={t.value} value={t.value} className="mr-1">
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </div>
      <TabsContent value={value} />
    </Tabs>
  );
}

function ChatMessage({ role = "assistant", text }) {
  return (
    <div className={`flex items-start gap-3 ${role === "user" ? "flex-row-reverse" : ""}`}>
      <Avatar className="h-8 w-8" fallback={role === "user" ? "You" : "AI"} />
      <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm ${role === "user" ? "bg-blue-500 text-white" : "bg-neutral-800 text-neutral-100"}`}>
        {text}
      </div>
    </div>
  );
}

function ChatSidebar() {
  const [messages, setMessages] = useState([
    { id: 1, role: "assistant", text: "Hey! I can help you find the right bike. Any preferences?" },
    { id: 2, role: "user", text: "Looking for something under $2000, good for city + occasional trail." },
    { id: 3, role: "assistant", text: "Great! Hybrid or light gravel bikes could be perfect. Want disc brakes and wider tires?" },
  ]);
  const [input, setInput] = useState("");
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  function sendMessage(e) {
    e.preventDefault();
    if (!input.trim()) return;
    const newMsg = { id: Date.now(), role: "user", text: input.trim() };
    setMessages((m) => [...m, newMsg, { id: Date.now() + 1, role: "assistant", text: "Got it! I\'ll shortlist a few options for you." }]);
    setInput("");
  }

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-sm font-medium text-neutral-300">Buying assistant</CardTitle>
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col gap-4 p-0">
        <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto p-4">
          {messages.map((m) => (
            <ChatMessage key={m.id} role={m.role} text={m.text} />
          ))}
        </div>
        <div className="sticky bottom-0 w-full border-t border-neutral-800 bg-neutral-900/60 p-3">
          <form onSubmit={sendMessage} className="flex items-center gap-2">
            <div className="flex w-full items-center rounded-full border border-neutral-800 bg-neutral-800/70 px-4 shadow-inner shadow-black/20 focus-within:ring-2 focus-within:ring-blue-500">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask for size, terrain, budget…"
                className="h-11 w-full bg-transparent text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none"
              />
              <Button type="submit" size="sm" variant="secondary" className="my-1 rounded-full px-3">
                Send
              </Button>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}

function Rating({ value }) {
  const stars = useMemo(() => Array.from({ length: 5 }, (_, i) => i < Math.round(value)), [value]);
  return (
    <div className="flex items-center gap-1">
      {stars.map((filled, i) => (
        <Star key={i} className={`h-4 w-4 ${filled ? "fill-yellow-400 text-yellow-400" : "text-neutral-600"}`} />
      ))}
      <span className="ml-1 text-xs text-neutral-400">{value.toFixed(1)}</span>
    </div>
  );
}

function ProductCard({ bike }) {
  return (
    <Card className="overflow-hidden transition-all hover:translate-y-[-2px] hover:shadow-xl">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900">
        <img src={bike.image} alt={bike.name} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
        {bike.discount > 0 && (
          <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-green-500/15 px-2 py-1 text-xs font-medium text-green-400 backdrop-blur">
            <BadgePercent className="h-3.5 w-3.5" />
            {bike.discount}% off
          </div>
        )}
      </div>
      <CardContent className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h4 className="line-clamp-1 text-sm font-medium text-neutral-100">{bike.name}</h4>
            <div className="mt-1 flex items-center gap-2 text-xs text-neutral-400">
              <span>{bike.store}</span>
              <span>•</span>
              <span>{bike.distance} away</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold text-neutral-100">${bike.price.toLocaleString()}</div>
            <div className="text-xs text-neutral-400">incl. taxes</div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Rating value={bike.rating} />
          <div className="flex items-center gap-1 text-xs text-neutral-400">
            <Truck className="h-4 w-4" />
            <span>{bike.shipping}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ProductGrid({ category }) {
  const items = useMemo(
    () => DEMO_BIKES.filter((b) => (category === "gravel" ? true : b.category === category)),
    [category]
  );
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((bike) => (
        <ProductCard key={bike.id} bike={bike} />
      ))}
    </div>
  );
}

export default function App() {
  const [cat, setCat] = useState("road");

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <TopBar />

      <CategoryTabs value={cat} onValueChange={setCat} />

      <main className="mx-auto w-full max-w-7xl px-3 pb-8 pt-2 sm:px-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-neutral-200">Popular options</h2>
          <Button variant="outline" size="sm" className="rounded-full">View all</Button>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <div className="lg:col-span-4 order-2 lg:order-1">
            <div className="sticky top-16 h-[calc(100vh-6rem)]">
              <ChatSidebar />
            </div>
          </div>
          <div className="lg:col-span-8 order-1 lg:order-2">
            <ProductGrid category={cat} />
          </div>
        </div>
      </main>
    </div>
  );
}
