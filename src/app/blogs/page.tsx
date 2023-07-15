import RouterButton from '../components/router-button'

export default function BlogPage() {
  return (
    <div className="m-10 text-center">
      <span className="text-lg">タイトルを押して詳細へ！</span>
      <div className="my-5 flex justify-center">
        <RouterButton />
      </div>
    </div>
  )
}
