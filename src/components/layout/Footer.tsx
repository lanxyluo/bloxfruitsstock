import { Github, Twitter, Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="glass-effect border-t border-border/50 mt-auto">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <span className="text-muted-foreground">Made with</span>
            <Heart className="w-4 h-4 text-destructive" />
            <span className="text-muted-foreground">for Blox Fruits community</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200 p-2 rounded-lg hover:bg-secondary"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200 p-2 rounded-lg hover:bg-secondary"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-border/50 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 BloxStock. Not affiliated with Roblox Corporation.
          </p>
        </div>
      </div>
    </footer>
  )
}

