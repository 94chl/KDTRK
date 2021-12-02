import styled from "@emotion/styled";

const BreadcrumbItemContainer = styled.nav`
  display: inline-block;
  align-items: center;
`;

const Anchor = styled.a`
  color: inherit;
  text-decoration: none;
`;

const BreadcrumbItem = ({ children, href, active, __TYPE, ...props }) => {
  return (
    <BreadcrumbItemContainer {...props}>
      <Anchor href={href} strong={active}>
        {children}
      </Anchor>
      {!active ? <span> >> </span> : null}
    </BreadcrumbItemContainer>
  );
};

BreadcrumbItem.defaultProps = { __TYPE: "BreadcrumbItem" };

BreadcrumbItem.prototypes = { __TYPE: "BreadcrumbItem" };

export default BreadcrumbItem;
