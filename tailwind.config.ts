import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
		spacing: {
			'128': '32rem',   // custom spacing -> w-128 = 32rem
			'144': '36rem',
		},
		fontSize: {
			'cxs': '10px', // smaller than sm
			'cs': '12px', // between xl and 2xl
			'cs2': '14px', // for big headings
			'cn':'16px',
			'cn2':'18px',
			'clg':'20px',
			'clg2':'22px',
			'cxl':'26px',
			'cxl2':'30px',
			'cxxl':'34px',
			'cxxl2':'38px',
			'c3xl':'42px',
			'c3xl2':'46px',
			'c4xl':'50px',
			'c4xl2':'54px'
		},
  		backgroundImage: {
        	"btn-gradient-1": "linear-gradient(90deg, #E319BC 0%, #A36AE9 100%)",
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
			bg:'#050f1e',
			dark_bg:"#060F1E",
			grey:'#5E5E5E',
			pink: "#E319BC", // custom primary
			ash_blue:"#4E4E4E24",
			c_success:"#38EF7D",
			c_gray:"#B3B3B3",
			black:"#050F1E",
			c_black:"#060F1E",
			silicon:"#565656",
			deep_pink: "#64748B",
			deep_pink2:"#ae346e",
			muted2:"#C7C7C7",
			navyblue:"#0D244E",
			muted3:"#5C5C5C",
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	},
	screens: {
	  'xxs':'350px',
	  'xxs2':'400px',
      'xs': '480px', 
	  'xs2':'540px',
	  'w-600':'600px',  // Extra small devices
      'sm': '640px',
      'md': '768px',
	  'md1':'810px',
	  "md2":'900px',
      'lg': '1024px',
	  'lg2':'1100px',
      'xl': '1280px',
	  '1350':'1350px',
      '2xl': '1536px',
    },
	fontFamily: {
      poppins: ["Inter", 'sans-serif'],
    },
  },
  plugins: [],
};
export default config;
