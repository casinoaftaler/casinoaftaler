import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	screens: {
  		'xs': '400px',
  		'sm': '640px',
  		'md': '768px',
  		'lg': '1024px',
  		'xl': '1280px',
  		'2xl': '1536px'
  	},
  	extend: {
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		keyframes: {
			'accordion-down': {
				from: {
					height: '0',
					opacity: '0'
				},
				to: {
					height: 'var(--radix-accordion-content-height)',
					opacity: '1'
				}
			},
			'accordion-up': {
				from: {
					height: 'var(--radix-accordion-content-height)',
					opacity: '1'
				},
				to: {
					height: '0',
					opacity: '0'
				}
			},
			'collapsible-down': {
				from: {
					height: '0',
					opacity: '0'
				},
				to: {
					height: 'var(--radix-collapsible-content-height)',
					opacity: '1'
				}
			},
			'collapsible-up': {
				from: {
					height: 'var(--radix-collapsible-content-height)',
					opacity: '1'
				},
				to: {
					height: '0',
					opacity: '0'
				}
			},
			'shine': {
				'0%': { transform: 'translateX(-100%)' },
				'50%': { transform: 'translateX(100%)' },
				'100%': { transform: 'translateX(100%)' }
			},
			'expansion-flash': {
				'0%': { 
					boxShadow: '0 0 0 0 rgba(168, 85, 247, 0.8), inset 0 0 30px rgba(168, 85, 247, 0.5)',
					transform: 'scale(0.9)'
				},
				'50%': { 
					boxShadow: '0 0 40px 10px rgba(168, 85, 247, 0.6), inset 0 0 20px rgba(168, 85, 247, 0.3)',
					transform: 'scale(1.15)'
				},
				'100%': { 
					boxShadow: '0 0 25px 0 rgba(168, 85, 247, 0.4), inset 0 0 0 rgba(168, 85, 247, 0)',
					transform: 'scale(1.1)'
				}
			},
			'symbol-expand': {
				'0%': { transform: 'scale(0.5)', opacity: '0.5' },
				'50%': { transform: 'scale(1.3)' },
				'100%': { transform: 'scale(1.1)', opacity: '1' }
			},
			'expand-ring': {
				'0%': { transform: 'scale(0.8)', opacity: '1' },
				'100%': { transform: 'scale(1.5)', opacity: '0' }
			},
			'glow': {
				'0%, 100%': { 
					filter: 'drop-shadow(0 0 20px rgba(251,191,36,0.5)) drop-shadow(0 0 40px rgba(251,191,36,0.3)) drop-shadow(0 0 60px rgba(251,191,36,0.2))'
				},
				'50%': { 
					filter: 'drop-shadow(0 0 30px rgba(251,191,36,0.8)) drop-shadow(0 0 60px rgba(251,191,36,0.5)) drop-shadow(0 0 90px rgba(251,191,36,0.3))'
				}
			},
			'slot-land': {
				'0%': { 
					transform: 'translateY(-4px)',
					opacity: '0.9'
				},
				'100%': { 
					transform: 'translateY(0)',
					opacity: '1'
				}
			},
			'title-entrance': {
				'0%': { 
					opacity: '0',
					transform: 'scale(0.8) translateY(-20px)'
				},
				'100%': { 
					opacity: '1',
					transform: 'scale(1) translateY(0)'
				}
			},
			'scatter-celebration': {
				'0%, 100%': { 
					transform: 'scale(1)',
					filter: 'brightness(1)'
				},
				'50%': { 
					transform: 'scale(1.1)',
					filter: 'brightness(1.4)'
				}
			},
			'hero-float': {
				'0%, 100%': { transform: 'translateY(0) translateX(0)' },
				'25%': { transform: 'translateY(-15px) translateX(5px)' },
				'50%': { transform: 'translateY(-8px) translateX(-5px)' },
				'75%': { transform: 'translateY(-20px) translateX(3px)' }
			}
		},
		animation: {
			'accordion-down': 'accordion-down 0.2s ease-out',
			'accordion-up': 'accordion-up 0.2s ease-out',
			'collapsible-down': 'collapsible-down 0.3s ease-out',
			'collapsible-up': 'collapsible-up 0.3s ease-out',
			'expansion-flash': 'expansion-flash 0.6s ease-out',
			'symbol-expand': 'symbol-expand 0.5s ease-out',
			'expand-ring': 'expand-ring 0.6s ease-out forwards',
			'slot-land': 'slot-land 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
			'scatter-celebration': 'scatter-celebration 0.4s ease-in-out infinite',
			'hero-float': 'hero-float 6s ease-in-out infinite',
			'hero-float-slow': 'hero-float 8s ease-in-out infinite 1s',
			'hero-float-mid': 'hero-float 7s ease-in-out infinite 0.5s'
		},
  		fontFamily: {
  			sans: [
  				'Inter',
  				'ui-sans-serif',
  				'system-ui',
  				'-apple-system',
  				'BlinkMacSystemFont',
  				'Segoe UI',
  				'Roboto',
  				'Helvetica Neue',
  				'Arial',
  				'Noto Sans',
  				'sans-serif'
  			],
  			serif: [
  				'Lora',
  				'ui-serif',
  				'Georgia',
  				'Cambria',
  				'Times New Roman',
  				'Times',
  				'serif'
  			],
  			mono: [
  				'Space Mono',
  				'ui-monospace',
  				'SFMono-Regular',
  				'Menlo',
  				'Monaco',
  				'Consolas',
  				'Liberation Mono',
  				'Courier New',
  				'monospace'
  			]
  		},
  		boxShadow: {
  			'2xs': 'var(--shadow-2xs)',
  			xs: 'var(--shadow-xs)',
  			sm: 'var(--shadow-sm)',
  			md: 'var(--shadow-md)',
  			lg: 'var(--shadow-lg)',
  			xl: 'var(--shadow-xl)',
  			'2xl': 'var(--shadow-2xl)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
