import React, { useEffect, useState } from 'react';
import { Dates } from '@app/constants/Dates';
import { Avatar, Image } from 'antd';
import { Tag, ITag } from '../Tag/Tag';
import * as S from './ArticleCard.styles';

import ConfigSetting from './ArticleCardService';
interface ArticleCardProps {
  author?: React.ReactNode;
  imgUrl: any;
  title: string;
  date: number;
  description: string;
  avatar?: string;
  tags?: ITag[];
  className?: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  imgUrl,
  title,
  date,
  description,
  author,
  avatar,
  tags,
  className = 'article-card',
}) => {
  const [name, setName] = useState<string>('');

  useEffect(() => {
    ConfigSetting.getTitle(title).then((data: any) => {
      setName(data.body.user.name);
    });
  }, [title]);

  return (
    <S.Wrapper className={className}>
      <S.Header>{!!avatar && <Avatar src={avatar} alt="author" size={43} />}</S.Header>
      {imgUrl.map((img: string) => (
        <Image
          src={`http://149.51.37.29:8099/v1/get_img?name=${img}`}
          key={`${img}123`}
          alt="article"
          preview={false}
        />
      ))}

      <S.InfoWrapper>
        <S.InfoHeader>
          <S.Title>{name}</S.Title>
        </S.InfoHeader>
        <S.Description>{description}</S.Description>
      </S.InfoWrapper>

      {!!tags?.length && (
        <S.TagsWrapper>
          {tags.map((tag) => (
            <Tag key={tag.bgColor} title={tag.title} bgColor={tag.bgColor} />
          ))}
        </S.TagsWrapper>
      )}
    </S.Wrapper>
  );
};
