import CourseContainer from '../components/Student/course/CourseContainer'
import CurrentVideo from '../components/Student/course/CurrentVideo'
import Nav from '../components/Student/course/Nav'
import Video from '../components/Student/course/Video'
import VideoItem from '../components/Student/course/VideoItem'
import PrivateRoute from '../components/Student/PrivateRoute'
import VideoList from '../components/Student/VideoList'

const CoursePlayer = () => {
  return (
    <PrivateRoute>
      <Nav />
      <CourseContainer>
        <Video />
        <VideoList>
          <CurrentVideo />
          <VideoItem />
          <VideoItem />
        </VideoList>
      </CourseContainer>
    </PrivateRoute>
  )
}
export default CoursePlayer
