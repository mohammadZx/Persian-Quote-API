import Link from "next/link"
import { Github, Twitter, Send, Mail, ArrowUpRight, Code, BookOpen, History, Globe, Terminal } from "lucide-react"

export function Footer() {
  const shamsiYear = "۱۴۰۵"

  return (
    <footer className="border-t border-border bg-background mt-16 text-xs text-muted-foreground">
      <div className="container mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 mb-8">
          {/* معرفی پروژه */}
          <div className="sm:col-span-2 lg:col-span-5 flex flex-col gap-3">
            <Link href="/" className="inline-block text-foreground font-bold text-base hover:text-foreground/80 transition-colors">
              رابط برنامه‌نویسی ادبیات فارسی
            </Link>
            <p className="leading-relaxed max-w-md">
              پایگاه داده آزاد و رابط برنامه‌نویسی برای دسترسی ساختاریافته به متون ادب فارسی. مناسب پروژه‌های دانشگاهی، تحقیقات پردازش متن و سامانه‌های آموزشی.
            </p>
            <div className="flex items-center gap-2 mt-1">
              <a
                href="https://github.com/arsamadineh/Persian-Quote-API"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="گیت‌هاب"
                className="w-8 h-8 rounded-md border border-border flex items-center justify-center hover:text-foreground hover:border-foreground/60 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://x.com/dev_arsam"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (توییتر)"
                className="w-8 h-8 rounded-md border border-border flex items-center justify-center hover:text-foreground hover:border-foreground/60 transition-colors"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://t.me/arsamadineh"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="تلگرام"
                className="w-8 h-8 rounded-md border border-border flex items-center justify-center hover:text-foreground hover:border-foreground/60 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </a>
              <a
                href="mailto:contact@arsamadineh.ir"
                aria-label="ایمیل"
                className="w-8 h-8 rounded-md border border-border flex items-center justify-center hover:text-foreground hover:border-foreground/60 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* مستندات و منابع فنی */}
          <div className="lg:col-span-3">
            <h4 className="text-foreground font-semibold mb-3">
              مستندات و منابع
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/docs" className="hover:text-foreground transition-colors inline-flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  راهنمای اندپوینت‌ها
                </Link>
              </li>
              <li>
                <Link href="/examples" className="hover:text-foreground transition-colors inline-flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5" />
                  نمونه کدهای اتصال
                </Link>
              </li>
              <li>
                <Link href="/sakhtar" className="hover:text-foreground transition-colors inline-flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  معماری موتور تیغ
                </Link>
              </li>
              <li>
                <Link href="/changelog" className="hover:text-foreground transition-colors inline-flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5" />
                  تاریخچه نگارش‌ها
                </Link>
              </li>
            </ul>
          </div>

          {/* توسعه و نگهداری */}
          <div className="lg:col-span-4">
            <h4 className="text-foreground font-semibold mb-3">
              توسعه و نگهداری
            </h4>
            <p className="font-medium text-foreground mb-2">
              آرسام آدینه
            </p>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://arsamadineh.ir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors inline-flex items-center gap-1.5"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>arsamadineh.ir</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/arsamadineh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors inline-flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>صفحه توسعه‌دهنده در گیت‌هاب</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@arsamadineh.ir"
                  className="hover:text-foreground transition-colors inline-flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>contact@arsamadineh.ir</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* نوار کپی‌رایت و حقوقی */}
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
          <p>
            <span>© {shamsiYear}</span>
            <span className="mx-1.5">·</span>
            <span>پایگاه داده متن‌باز تحت پروانه MIT</span>
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              حریم خصوصی
            </Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              شرایط بهره‌برداری
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
