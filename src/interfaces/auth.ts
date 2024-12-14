import { JwtPayload } from 'jsonwebtoken'

export interface DecodedToken extends JwtPayload {
    id: string // Add your specific fields here if needed
}
