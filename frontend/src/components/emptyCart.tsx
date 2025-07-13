export default function EmptyCart() {
    return (
        <div className="flex justify-center mb-8">
            <svg
                width="200"
                height="150"
                viewBox="0 0 200 150"
                className="text-gray-300"
            >
                {/* Shopping bag */}
                <path
                    d="M60 50 L60 40 Q60 30 70 30 L90 30 Q100 30 100 40 L100 50 M50 50 L50 130 Q50 140 60 140 L140 140 Q150 140 150 130 L150 50 Z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                />

                {/* Handle */}
                <path
                    d="M70 40 Q70 25 80 25 Q90 25 90 40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                />

                {/* Floating cards/courses */}
                <g transform="translate(120, 30)">
                    <rect
                        x="0"
                        y="0"
                        width="25"
                        height="20"
                        rx="2"
                        fill="currentColor"
                        opacity="0.3"
                    />
                    <rect
                        x="2"
                        y="2"
                        width="21"
                        height="3"
                        rx="1"
                        fill="white"
                    />
                    <rect
                        x="2"
                        y="7"
                        width="15"
                        height="2"
                        rx="1"
                        fill="white"
                    />
                    <rect
                        x="2"
                        y="11"
                        width="18"
                        height="2"
                        rx="1"
                        fill="white"
                    />
                </g>

                <g transform="translate(140, 60)">
                    <rect
                        x="0"
                        y="0"
                        width="25"
                        height="20"
                        rx="2"
                        fill="currentColor"
                        opacity="0.3"
                    />
                    <rect
                        x="2"
                        y="2"
                        width="21"
                        height="3"
                        rx="1"
                        fill="white"
                    />
                    <rect
                        x="2"
                        y="7"
                        width="15"
                        height="2"
                        rx="1"
                        fill="white"
                    />
                    <rect
                        x="2"
                        y="11"
                        width="18"
                        height="2"
                        rx="1"
                        fill="white"
                    />
                </g>

                <g transform="translate(110, 85)">
                    <rect
                        x="0"
                        y="0"
                        width="25"
                        height="20"
                        rx="2"
                        fill="currentColor"
                        opacity="0.3"
                    />
                    <rect
                        x="2"
                        y="2"
                        width="21"
                        height="3"
                        rx="1"
                        fill="white"
                    />
                    <rect
                        x="2"
                        y="7"
                        width="15"
                        height="2"
                        rx="1"
                        fill="white"
                    />
                    <rect
                        x="2"
                        y="11"
                        width="18"
                        height="2"
                        rx="1"
                        fill="white"
                    />
                </g>

                {/* Dotted lines connecting cards to bag */}
                <line
                    x1="100"
                    y1="60"
                    x2="120"
                    y2="45"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="2,2"
                    opacity="0.5"
                />
                <line
                    x1="110"
                    y1="70"
                    x2="140"
                    y2="75"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="2,2"
                    opacity="0.5"
                />
                <line
                    x1="105"
                    y1="80"
                    x2="110"
                    y2="95"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="2,2"
                    opacity="0.5"
                />
            </svg>
        </div>
    );
}
