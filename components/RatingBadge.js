import {Star} from "lucide-react";import {formatRating} from "@/lib/utils";
export default function RatingBadge({value,size="sm"}){return <span className={`rating-badge ${size}` }><Star size={size==="lg"?16:13} fill="currentColor"/>{formatRating(value)}<small>/ 10</small></span>}
