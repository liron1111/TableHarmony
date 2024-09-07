import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SmileIcon } from "lucide-react";

export default function ChatPage() {
  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>Chat</PageHeaderHeading>
      </PageHeader>
      <section className="flex h-[calc(100vh-10rem)] w-full flex-col">
        <main className="flex-1 overflow-auto p-4">
          <div className="space-y-4">
            <div className="flex items-end gap-2">
              <div className="rounded-lg bg-zinc-200 p-2 dark:bg-zinc-700">
                <p className="text-sm">Hello, how are you?</p>
              </div>
            </div>
            <div className="flex items-end justify-end gap-2">
              <div className="rounded-lg bg-blue-500 p-2 text-white">
                <p className="text-sm">I&apos;m fine, thanks for asking!</p>
              </div>
            </div>
          </div>
        </main>
        <footer className="p-4">
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost">
              <SmileIcon className="h-6 w-6" />
            </Button>
            <Input className="flex-1" placeholder="Type a message..." />
            <Button>Send</Button>
          </div>
        </footer>
      </section>
    </div>
  );
}
