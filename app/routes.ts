import {type RouteConfig, index, route} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route('/auth', 'routes/auth.tsx'),
  route('/upload', 'routes/upload.tsx'),
  route('/about','routes/about.tsx' ),
  route('/contact','routes/contact.tsx' ),
  route('/resume/:id','routes/resume.tsx' ),

] satisfies RouteConfig;