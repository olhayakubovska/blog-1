import { useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Icon, Input } from "../../../../components";
import { SpecialPanel } from "../special-pane/special-panel";
import { sanitizeContent } from "./utils";
import { useDispatch } from "react-redux";
import { savePostAsync } from "../../../../actions/save-post-async";
import { useNavigate } from "react-router-dom";
// import { PROP_TYPES } from "../../../../constants";

const PostFormContainer = ({
  className,
  post: { id: postIdForEdit, title, imageUrl, content, publishedAt },
}) => {
  const [imageUrlValue, setImageUrlValue] = useState(imageUrl);
  const [titleValue, setTitleValue] = useState(imageUrl);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    setImageUrlValue(imageUrl);
    setTitleValue(title);
  }, [imageUrl, title]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSave = () => {
    const newContent = sanitizeContent(contentRef.current.innerHTML);

    // dispatch(
    //   savePostAsync(postIdForEdit, {
    //     image: imageUrlValue,
    //     title: titleValue,
    //     content: newContent,
    //   })
    // )

    dispatch(
      savePostAsync(postIdForEdit, {
        image: imageUrlValue,
        title: titleValue,
        content: newContent,
      })
    ).then((result) => {
      navigate(`/posts/${result.id}`);
    }).catch((error) => {
      console.error("Error saving the post:", error);
    });
    

  };

  //navigate(`/posts/${id}`));
  return (
    <div className={className}>
      <Input
        value={imageUrlValue}
        placeholder="Изображение..."
        onChange={({ target }) => setImageUrlValue(target.value)}
      />
      <Input
        value={titleValue}
        placeholder="Заголовок..."
        onChange={({ target }) => setTitleValue(target.value)}
      />

      <SpecialPanel
        id={postIdForEdit}
        publishedAt={publishedAt}
        margin="20px 0"
        editButton={<Icon id="fa-floppy-o" size="18px" onClick={onSave} />}
      />

      <div
        ref={contentRef}
        contentEditable={true}
        suppressContentEditableWarning={true}
        className="post-text"
      >
        {content}
      </div>
    </div>
  );
};

export const PostForm = styled(PostFormContainer)`
  & img {
    float: left; /* Обтекание изображения слева */
    margin: 0 20px 10px 0; /* Отступы: сверху 0, справа 20px, снизу 10px, слева 0 */
  }

  & .post-text {
    min-height: 80px;
    border: 1px solid #000;
    font-size: 18px; /* Размер шрифта */
    white-space: pre-line; /* Сохранение пробелов и переносов строк, как в исходном тексте */
  }
`;

// PostForm.propTypes = {
//   post: PROP_TYPES.POST.isRequired,
// };
