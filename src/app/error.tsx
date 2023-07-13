'use client'

export default function Error({error}: {error: Error}) {
    return <div>
        <p>
            エラー: {error.message}
        </p>
    </div>
}
